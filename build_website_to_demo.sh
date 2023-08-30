#!/bin/sh
# SOURCE="kyons-nx/dist/apps/student/firebase/"
# DESTINATION="firebase/public/"
# TARGET="firebase/public/student"
echo "Start build"
pnpm build
echo "End build"
echo "Start delete"
AWS_PROFILE=kyons-importer aws s3 rm --recursive s3://website.kyons.vn/
echo "Deleted"
echo "Start deploy"
AWS_PROFILE=kyons-importer aws s3 cp --recursive ./dist s3://website.kyons.vn
echo "Done deploy"
