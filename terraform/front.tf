resource "aws_s3_bucket" "cowanaero-ian" {
  bucket = "cowanaero-ian${var.ENV_SUFFIX}"
}

resource "aws_s3_bucket_public_access_block" "cowanaero-ian-public-access" {
  bucket = aws_s3_bucket.cowanaero-ian.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_acm_certificate" "cowanaero-ian-cert" {
  domain_name       = "ian${var.ENV_SUFFIX}.${var.DOMAIN}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

locals {
  s3_origin_id = "${aws_s3_bucket.cowanaero-ian.bucket}-origin"
}

resource "aws_cloudfront_origin_access_control" "cowanaero-ian-cloudfront-oac" {
  name                              = "cowanaero-ian-cloudfront-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cowanaero-ian-cloudfront" {
  origin {
    domain_name              = aws_s3_bucket.cowanaero-ian.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.cowanaero-ian-cloudfront-oac.id
    origin_id                = local.s3_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = [
    "ian${var.ENV_SUFFIX}.${var.DOMAIN}"
  ]

  default_cache_behavior {
    allowed_methods  = ["HEAD", "GET", "OPTIONS"]
    cached_methods   = ["HEAD", "GET", "OPTIONS"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cowanaero-ian-cert.arn
    ssl_support_method  = "sni-only"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }
}

resource "aws_s3_bucket_policy" "cowanaero-ian-policy" {
  bucket = aws_s3_bucket.cowanaero-ian.id

  policy = jsonencode({
    Version = "2012-10-17"
    Id      = "AllowGetObjects"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipalReadOnly"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.cowanaero-ian.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "${aws_cloudfront_distribution.cowanaero-ian-cloudfront.arn}"
          }
        }
      }
    ]
  })
}
