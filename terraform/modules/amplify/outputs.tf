# modules/amplify/outputs.tf

output "app_id" {
  description = "ID of the Amplify app"
  value       = aws_amplify_app.this.id
}

output "app_arn" {
  description = "ARN of the Amplify app"
  value       = aws_amplify_app.this.arn
}

output "default_domain" {
  description = "Default domain of the Amplify app"
  value       = aws_amplify_app.this.default_domain
}

output "branch_urls" {
  description = "URLs of deployed branches"
  value = {
    for branch_name, branch in aws_amplify_branch.this :
    branch_name => "https://${branch.branch_name}.${aws_amplify_app.this.default_domain}"
  }
}

output "custom_domain" {
  description = "Custom domain association"
  value       = var.domain_name != "" ? aws_amplify_domain_association.this[0].domain_name : null
}