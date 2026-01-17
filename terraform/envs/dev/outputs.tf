# envs/dev/outputs.tf

output "api_endpoint" {
  description = "API Gateway endpoint URL"
  value       = module.api_gateway.stage_invoke_url
}

output "amplify_app_url" {
  description = "Amplify app default URL"
  value       = "https://main.${module.amplify.default_domain}"
}

output "lambda_function_name" {
  description = "Lambda function name"
  value       = module.api_lambda.function_name
}

output "amplify_app_id" {
  description = "Amplify app ID"
  value       = module.amplify.app_id
}



