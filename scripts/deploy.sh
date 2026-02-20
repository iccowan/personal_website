#!/bin/sh

ABS_PATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
PROJECT_PATH=$ABS_PATH/..

aws s3 mv $PROJECT_PATH/build/ "s3://${S3_BUCKET_NAME}/" --recursive
