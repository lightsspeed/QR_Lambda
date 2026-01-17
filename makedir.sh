#!/usr/bin/env bash

# Create Terraform project structure

mkdir -p terraform/modules/lambda
mkdir -p terraform/modules/api-gateway
mkdir -p terraform/modules/amplify
mkdir -p terraform/envs/dev
mkdir -p terraform/envs/prod

# Root level files
touch terraform/main.tf

# lambda module
touch terraform/modules/lambda/main.tf
touch terraform/modules/lambda/iam.tf
touch terraform/modules/lambda/variables.tf
touch terraform/modules/lambda/outputs.tf

# api-gateway module
touch terraform/modules/api-gateway/main.tf
touch terraform/modules/api-gateway/routes.tf
touch terraform/modules/api-gateway/outputs.tf

# amplify module
touch terraform/modules/amplify/main.tf
touch terraform/modules/amplify/domain.tf
touch terraform/modules/amplify/outputs.tf

# environments
# dev
touch terraform/envs/dev/main.tf
touch terraform/envs/dev/backend.tf
touch terraform/envs/dev/terraform.tfvars

# prod
touch terraform/envs/prod/main.tf
touch terraform/envs/prod/backend.tf
touch terraform/envs/prod/terraform.tfvars

echo "Terraform folder structure created successfully!"
echo ""
echo "tree terraform  (if you have tree command installed)"
echo ""
ls -R terraform