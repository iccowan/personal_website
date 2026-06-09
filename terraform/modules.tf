module "gha-openid" {
  source        = "./gha-openid"
  S3_BUCKET_ARN = aws_s3_bucket.cowanaero-ian.arn
}
