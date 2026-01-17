# modules/lambda/variables.tf

variable "function_name" {
  description = "Name of the Lambda function"
  type        = string
}

variable "lambda_zip_path" {
  description = "Path to Lambda deployment package"
  type        = string
  default     = "../../../apps/backend/qr-lambda.zip"  # ← Updated path
}

variable "handler" {
  description = "Lambda function handler"
  type        = string
  default     = "index.handler"
}

variable "runtime" {
  description = "Lambda runtime"
  type        = string
  default     = "nodejs18.x"
}

variable "timeout" {
  description = "Lambda timeout in seconds"
  type        = number
  default     = 30
}

variable "memory_size" {
  description = "Lambda memory size in MB"
  type        = number
  default     = 256
}

variable "environment_variables" {
  description = "Environment variables for Lambda"
  type        = map(string)
  default     = {}
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days"
  type        = number
  default     = 7
}

variable "create_api_gateway_permission" {
  description = "Whether to create API Gateway invoke permission"
  type        = bool
  default     = false
}

variable "api_gateway_execution_arn" {
  description = "API Gateway execution ARN"
  type        = string
  default     = ""
}

variable "additional_policy_statements" {
  description = "Additional IAM policy statements for Lambda"
  type        = list(any)
  default     = []
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}