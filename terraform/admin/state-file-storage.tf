resource "aws_s3_bucket" "cowanaero-terraform-state" {
  bucket = "cowanaero-terraform-state"
}

resource "aws_dynamodb_table" "cowanaero-terraform-lock" {
  name         = "cowanaero-terraform-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}
