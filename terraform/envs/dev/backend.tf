# envs/dev/backend.tf

terraform {
  backend "s3" {
    bucket         = "proj-qrcode-lambda"
    key            = "dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "proj-qrcode-statelock"
  }
}