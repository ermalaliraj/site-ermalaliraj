pwd
SRC_DIR=./
STAGE_DIR=/tmp
DEPLOY_DIR=/www/wwwroot/site-ermalaliraj
ZIP_NAME=site-ermalaliraj.tar.gz

# Stage files
echo "Creating zip $ZIP_NAME with content of folder '$SRC_DIR'"
tar cvzf site-ermalaliraj.tar.gz --exclude='.git' $SRC_DIR
echo "$ZIP_NAME created. Ready to be sent to the remote server: $(grep 'prdServer' /etc/hosts | awk '{print $1}')"
ssh prdServer mkdir -p $STAGE_DIR
ssh prdServer sudo rm -rf $STAGE_DIR/$ZIP_NAME
scp -r $ZIP_NAME prdServer:$STAGE_DIR
echo "Zip sent to the remote server: $(grep 'prdServer' /etc/hosts | awk '{print $1}')$STAGE_DIR/$ZIP_NAME"

# Deploy
ssh prdServer <<'ENDSSH'
if [ -f "/tmp/site-ermalaliraj.tar.gz" ]; then
    echo "Found file /tmp/site-ermalaliraj.tar.gz in the target server. Will start the deploy..."
    sudo rm -rf /www/wwwroot/site-ermalaliraj
    sudo mkdir -p /www/wwwroot/site-ermalaliraj
    sudo chown -R jenkins:jenkins /www/wwwroot/site-ermalaliraj
    mv /tmp/site-ermalaliraj.tar.gz /www/wwwroot/site-ermalaliraj
    cd /www/wwwroot/site-ermalaliraj/
    sudo tar xvzf site-ermalaliraj.tar.gz --strip-components 1
    echo "Exploded successfully zip site-ermalaliraj.tar.gz in /www/wwwroot/site-ermalaliraj/"
    sudo rm -f site-ermalaliraj.tar.gz
    echo "✅ site-ermalaliraj deployed successfully."
    curl -X POST https://hooks.slack.com/services/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  \
         -H 'Content-type: application/json' \
         --data '{"text":"✅ Test: *PRD site-ermalaliraj* deployment was successful."}' 
else
    echo "File /tmp/site-ermalaliraj.tar.gz does not exist. Deploy didn't succeed. Old application version is still running!"
    curl -X POST https://hooks.slack.com/services/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  \
         -H 'Content-type: application/json' \
         --data '{"text":"❌ Test: *PRD site-ermalaliraj* deployment failed."}' 
fi
ENDSSH