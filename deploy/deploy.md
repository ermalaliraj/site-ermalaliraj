### Add nginx rule
    scp -r deploy/nginx/prd/ermalaliraj.com.conf root@95.211.140.132:/www/server/panel/vhost/nginx/
    ssh root@95.211.140.132
    sudo nginx -t
    sudo nginx -s reload

### Create Jenkins Pipeline
    sh deploy/jenkins/prd/deploy.sh