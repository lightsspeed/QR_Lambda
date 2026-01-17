# modules/amplify/domain.tf

resource "aws_amplify_domain_association" "this" {
  count = var.domain_name != "" ? 1 : 0

  app_id      = aws_amplify_app.this.id
  domain_name = var.domain_name

  wait_for_verification = var.wait_for_verification

  dynamic "sub_domain" {
    for_each = var.sub_domains
    content {
      branch_name = sub_domain.value.branch_name
      prefix      = sub_domain.value.prefix
    }
  }
}