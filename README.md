#  AWS Cloud CRUD Deployment

##  Overview
This project demonstrates a full-stack cloud-based CRUD application deployed on AWS using Docker and Nginx.

### System Components:
- **Frontend:** React  
- **Backend:** Django REST Framework  
- **Database:** PostgreSQL  
- **Reverse Proxy:** Nginx  
- **Deployment:** AWS EC2 (Free Tier)  
- **Containerization:** Docker & Docker Compose  

---

##  Architecture Design


User → Nginx → (Frontend + Backend API) → PostgreSQL


### Routing:
- `/` → React frontend  
- `/api/` → Django backend  

- Backend communicates with PostgreSQL  
- All services run inside Docker containers  

---

##  Tech Stack

| Layer            | Technology        |
|------------------|------------------|
| Frontend         | React            |
| Backend          | Django REST      |
| Database         | PostgreSQL       |
| Reverse Proxy    | Nginx            |
| Deployment       | AWS EC2          |
| Containerization | Docker           |

---

##  Deployment Steps

# 1. Clone Repository

- git clone (https://github.com/AU-02/aws-cloud-crud-deployment.git)
- cd aws-cloud-crud-deployment
  
# 2. Run with Docker
- docker-compose up --build
# 3. Access Application
- (http://107.20.74.253/)
# 4. AWS Deployment (EC2)
Steps:
- Launch EC2 instance:
- OS: Ubuntu 22.04
- Type: t2.micro
- Configure Security Group:
- Port 22 (SSH)
- Port 80 (HTTP)
- Port 443 (HTTPS)
Connect to instance:
- ssh -i key.pem ubuntu@<PUBLIC_IP>
Install Docker & Docker Compose
Clone repository and run:
- docker-compose up -d --build
# IAM Configuration (S3 Access)
Created IAM user with:
AmazonS3FullAccess
Stored credentials in .env
Backend uploads files to S3 bucket
# Security Group Rules
Type	Port	Source
SSH	22	Anywhere
HTTP	80	Anywhere
HTTPS	443	Anywhere
# AWS Free Tier Setup
Instance type: t2.micro
Storage: 8GB
Region: us-east-1
Free-tier eligible services used
# Features
Create tasks
View tasks
Delete tasks
REST API integration
Dockerized architecture
Cloud deployment
# Project Structure
backend/
frontend/
nginx/
docker-compose.yml
.env
README.md
# Key Challenges & Solutions
Fixed Django ALLOWED_HOSTS issue in Docker
Resolved Nginx reverse proxy routing issues
Handled multipart/form-data for file uploads
Solved Docker storage limitations on EC2
# Conclusion

This project demonstrates a complete cloud-native application deployment using modern DevOps practices, including containerization, reverse proxying, and AWS infrastructure setup.
