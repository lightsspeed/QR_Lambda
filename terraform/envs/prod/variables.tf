# envs/prod/variables.tf

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "prod"
}

variable "lambda_zip_path" {
  description = "Path to Lambda deployment package"
  type        = string
}

variable "github_repository_url" {
  description = "GitHub repository URL for Amplify"
  type        = string
}

variable "github_access_token" {
  description = "GitHub personal access token"
  type        = string
  sensitive   = true
}

variable "custom_domain" {
  description = "Custom domain for Amplify app"
  type        = string
}

variable "cors_allow_origins" {
  description = "CORS allowed origins"
  type        = list(string)
  default     = []
}