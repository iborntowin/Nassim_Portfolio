#!/bin/bash
# Advanced infrastructure automation and monitoring script

set -euo pipefail

# Configuration
CLUSTER_NAME="production-cluster"
REGION="us-west-2"
NAMESPACE="production"
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."

# Colors for output
RED='\x1b[0;31m'
GREEN='\x1b[0;32m'
YELLOW='\x1b[1;33m'
BLUE='\x1b[0;34m'
NC='\x1b[0m' # No Color

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Check cluster health
check_cluster_health() {
    log "Checking cluster health..."
    
    # Check node status
    UNHEALTHY_NODES=$(kubectl get nodes --no-headers | grep -v Ready | wc -l)
    if [ "$UNHEALTHY_NODES" -gt 0 ]; then
        error "Found $UNHEALTHY_NODES unhealthy nodes"
        kubectl get nodes --no-headers | grep -v Ready
        return 1
    fi
    
    # Check pod status
    FAILED_PODS=$(kubectl get pods --all-namespaces --field-selector=status.phase=Failed --no-headers | wc -l)
    if [ "$FAILED_PODS" -gt 0 ]; then
        error "Found $FAILED_PODS failed pods"
        kubectl get pods --all-namespaces --field-selector=status.phase=Failed
    fi
    
    success "Cluster health check passed"
}

# Deploy application with zero downtime
deploy_application() {
    local IMAGE_TAG=$1
    log "Deploying application with image tag: $IMAGE_TAG"
    
    # Update deployment
    kubectl set image deployment/web-app-deployment \
        web-app=registry.company.com/web-app:$IMAGE_TAG \
        -n $NAMESPACE
    
    # Wait for rollout to complete
    kubectl rollout status deployment/web-app-deployment -n $NAMESPACE --timeout=300s
    
    # Verify deployment
    READY_REPLICAS=$(kubectl get deployment web-app-deployment -n $NAMESPACE -o jsonpath='{.status.readyReplicas}')
    DESIRED_REPLICAS=$(kubectl get deployment web-app-deployment -n $NAMESPACE -o jsonpath='{.spec.replicas}')
    
    if [ "$READY_REPLICAS" -eq "$DESIRED_REPLICAS" ]; then
        success "Deployment successful: $READY_REPLICAS/$DESIRED_REPLICAS replicas ready"
        send_slack_notification "✅ Deployment successful for $IMAGE_TAG"
    else
        error "Deployment failed: only $READY_REPLICAS/$DESIRED_REPLICAS replicas ready"
        kubectl rollout undo deployment/web-app-deployment -n $NAMESPACE
        return 1
    fi
}

# Monitor system resources
monitor_resources() {
    log "Monitoring system resources..."
    
    # CPU and Memory usage
    kubectl top nodes
    kubectl top pods -n $NAMESPACE
    
    # Check for resource pressure
    HIGH_CPU_NODES=$(kubectl top nodes --no-headers | awk '{if($3+0 > 80) print $1}')
    if [ -n "$HIGH_CPU_NODES" ]; then
        error "High CPU usage detected on nodes: $HIGH_CPU_NODES"
        send_slack_notification "⚠️ High CPU usage detected on nodes: $HIGH_CPU_NODES"
    fi
}

# Send Slack notification
send_slack_notification() {
    local MESSAGE=$1
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"$MESSAGE\"}" \
        $SLACK_WEBHOOK_URL
}

# Main execution
main() {
    log "Starting infrastructure automation script..."
    
    check_cluster_health
    monitor_resources
    
    if [ "${1:-}" = "deploy" ] && [ -n "${2:-}" ]; then
        deploy_application "$2"
    fi
    
    success "Infrastructure automation completed successfully"
}

# Trap errors and send notifications
trap 'error "Script failed at line $LINENO"; send_slack_notification "❌ Infrastructure script failed"' ERR

main "$@"