# modules/amplify/variables.tf

variable "app_name" {
  description = "Name of the Amplify app"
  type        = string
}

variable "repository_url" {
  description = "GitHub repository URL"
  type        = string
}

variable "github_access_token" {
  description = "GitHub access token for repository access"
  type        = string
  sensitive   = true
}

variable "build_spec" {
  description = "Build specification for Amplify"
  type        = string
  default     = <<-EOT
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: build
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
  EOT
}

variable "environment_variables" {
  description = "Environment variables for Amplify app"
  type        = map(string)
  default     = {}
}

variable "custom_rules" {
  description = "Custom rules for Amplify app"
  type = list(object({
    source = string
    status = string
    target = string
  }))
  default = []
}

variable "branches" {
  description = "Branches to deploy"
  type = map(object({
    stage                 = string
    enable_auto_build     = bool
    environment_variables = map(string)
  }))
  default = {}
}

variable "domain_name" {
  description = "Custom domain name"
  type        = string
  default     = ""
}

variable "wait_for_verification" {
  description = "Wait for domain verification"
  type        = bool
  default     = false
}

variable "sub_domains" {
  description = "Sub-domain configurations"
  type = list(object({
    branch_name = string
    prefix      = string
  }))
  default = []
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}