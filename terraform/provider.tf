terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.94.0"
    }
  }

  backend "s3" {
    bucket         = "cowanaero-terraform-state"
    profile        = "cowanaero-terraform"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "cowanaero-terraform-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.AWS_REGION
}
