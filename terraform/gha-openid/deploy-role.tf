resource "aws_iam_role" "gha-deploy-role" {
  name = "GHADeployAssumeRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Federated = aws_iam_openid_connect_provider.gha.arn
        },
        Action = "sts:AssumeRoleWithWebIdentity",
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          },
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:iccowan/personal_website:*"
          }
        }
      }
    ]
  })
}

resource "aws_iam_policy" "cowanaero-deploy-policy" {
  name = "cowanaero-deploy-policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "S3BucketUpdateFrontendCode"
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ],
        Resource = ["${var.S3_BUCKET_ARN}/*", var.S3_BUCKET_ARN]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "gha-deploy-role-deploy-policy" {
  role       = aws_iam_role.gha-deploy-role.name
  policy_arn = aws_iam_policy.cowanaero-deploy-policy.arn
}
