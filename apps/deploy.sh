#deploy this app
#!/bin/bash

set -euo pipefail

# ---------- CONFIG ----------
IMAGE_NAME="qr_lambda"
IMAGE_TAG="v1.0.0"
REGISTRY="lightsspeed/${IMAGE_NAME}"
NAMESPACE="qr-lambda"
DEPLOYMENT_NAME="qr-lambda-deployment"
# ---------- REQUIRED ENVS ----------
export VITE_API_ENDPOINT="https://api.example.com"
export VITE_API_KEY="your_api_key_here"
echo "▶ Building image with API envs baked in…"
docker build \
  --build-arg VITE_API_ENDPOINT="$VITE_API_ENDPOINT" \
  --build-arg VITE_API_KEY="$VITE_API_KEY" \
  -t "${REGISTRY}:${IMAGE_TAG}" .


echo "▶ Pushing image…"
docker push "${REGISTRY}:${IMAGE_TAG}"
#want to run manifest files from k8s folder

echo "▶ Applying Kubernetes manifests…"
kubectl apply -f ./k8s/namespace.yaml -n "${NAMESPACE}"
kubectl apply -f ./k8s/ingress-local.yaml -n "${NAMESPACE}"
kubectl apply -f ./k8s/secret.yaml -n "${NAMESPACE}"
kubectl apply -f ./k8s/deployment.yaml -n "${NAMESPACE}"
kubectl apply -f ./k8s/service.yaml -n "${NAMESPACE}"
kubectl apply -f ./k8s/configmap.yaml -n "${NAMESPACE}"

echo "▶ Updating Kubernetes deployment…"
kubectl set image deployment/${DEPLOYMENT_NAME} \
  ${DEPLOYMENT_NAME}="${REGISTRY}:${IMAGE_TAG}" \
  -n "${NAMESPACE}" 

echo "▶ Waiting for rollout…"
kubectl rollout status deployment/${DEPLOYMENT_NAME} -n "${NAMESPACE}"

#port forward to access the service locally
echo "▶ Port-forwarding service to http://localhost:8080 …"
kubectl port-forward svc/qr-lambda-service -n qr-lambda 8080:
80 &
echo "✅ Deployment complete!"

