# envs/prod/main.tf

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = "prod"
      ManagedBy   = "Terraform"
      Project     = var.project_name
    }
  }
}

# Lambda Functions
module "api_lambda" {
  source = "../../modules/lambda"

  function_name  = "${var.project_name}-api-${var.environment}"
  lambda_zip_path = var.lambda_zip_path
  handler        = "index.handler"
  runtime        = "nodejs18.x"
  timeout        = 30
  memory_size    = 512

  environment_variables = {
    ENVIRONMENT = var.environment
    NODE_ENV    = "production"
  }

  create_api_gateway_permission = true
  api_gateway_execution_arn     = module.api_gateway.api_execution_arn

  log_retention_days = 30

  tags = {
    Name = "${var.project_name}-api-lambda"
  }
}

# API Gateway
module "api_gateway" {
  source = "../../modules/api-gateway"

  api_name        = "${var.project_name}-api-${var.environment}"
  api_description = "API Gateway for ${var.project_name} - ${var.environment}"
  stage_name      = var.environment

  cors_allow_origins = var.cors_allow_origins
  
  lambda_integrations = {
    api = {
      invoke_arn = module.api_lambda.invoke_arn
      route_key  = "ANY /{proxy+}"
    }
    root = {
      invoke_arn = module.api_lambda.invoke_arn
      route_key  = "GET /"
    }
  }

  log_retention_days = 30

  tags = {
    Name = "${var.project_name}-api-gateway"
  }
}

# Amplify Hosting
module "amplify" {
  source = "../../modules/amplify"

  app_name             = "${var.project_name}-${var.environment}"
  repository_url       = var.github_repository_url
  github_access_token  = var.github_access_token

  environment_variables = {
    REACT_APP_API_URL = module.api_gateway.stage_invoke_url
    REACT_APP_ENV     = var.environment
  }

  branches = {
    main = {
      stage                 = "PRODUCTION"
      enable_auto_build     = true
      environment_variables = {}
    }
  }

  domain_name           = var.custom_domain
  wait_for_verification = true
  sub_domains = var.custom_domain != "" ? [
    {
      branch_name = "main"
      prefix      = ""
    },
    {
      branch_name = "main"
      prefix      = "www"
    }
  ] : []

  tags = {
    Name = "${var.project_name}-amplify"
  }
}