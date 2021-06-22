## react-attendance-system

** START REACT CLIENT PORT => 3000 **
_italics_ cd client/ && npm start

** START EXPRESS SERVER => 5000 **
_italics_ cd server/ && npm run dev  

# Configure Wen Server Nginx  
_italics_ 
upstream nodeserver {
        server localhost:5000;
}

upstream webClient {
        server localhost:3000;
}
 server {
listen 80 default_server;
listen [::]:80 default_server;
server_name localhost;

location / {
	proxy_pass http://webClient;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;     
        break;
}


location /web/api {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;     
        proxy_set_header X-Forwarded-Proto $scheme; 
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_read_timeout 5m;
        proxy_connect_timeout 5m;
        proxy_pass http://nodeserver;
        proxy_redirect off;
  
	 
}
location /public {
        proxy_pass http://nodeserver/public;
        expires 30d;
     }
  location /phpmyadmin {
               root /usr/share/;
               index index.php index.html index.htm;
               location ~ ^/phpmyadmin/(.+\.php)$ {
                       try_files $uri =404;
                       root /usr/share/;
                       fastcgi_pass   unix:/run/php/php7.2-fpm.sock;
                       fastcgi_index index.php;
                       fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                       include /etc/nginx/fastcgi_params;
               }
               location ~* ^/phpmyadmin/(.+\.(jpg|jpeg|gif|css|png|js|ico|html|xml|txt))$ {
                       root /usr/share/;
               }
        }
        location /phpMyAdmin {
               rewrite ^/* /phpmyadmin last;
        }

 }
