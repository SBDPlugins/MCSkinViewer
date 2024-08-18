# SSL folder
This folder contains the SSL certificates and keys for the server.

## Generate self-signed pair
To generate a self-signed pair of SSL certificate and key, run the following command in this folder:
```bash
openssl req -x509 -sha256 -nodes -days 9365 -newkey rsa:2048 -keyout key.pem -out cert.pem
```