# modules/amplify/main.tf

resource "aws_amplify_app" "this" {
  name       = var.app_name
  repository = var.repository_url

  access_token = var.github_access_token

  build_spec = var.build_spec

  environment_variables = var.environment_variables

  custom_rule {
    source = "/<*>"
    status = "404"
    target = "/index.html"
  }

  dynamic "custom_rule" {
    for_each = var.custom_rules
    content {
      source = custom_rule.value.source
      status = custom_rule.value.status
      target = custom_rule.value.target
    }
  }

  tags = var.tags
}

resource "aws_amplify_branch" "this" {
  for_each = var.branches

  app_id      = aws_amplify_app.this.id
  branch_name = each.key
  
  stage = each.value.stage
  
  enable_auto_build = each.value.enable_auto_build

  environment_variables = merge(
    var.environment_variables,
    each.value.environment_variables
  )

  tags = var.tags
}