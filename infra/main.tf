terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

resource "docker_image" "todo_app" {
  name         = "todo-app:latest"
  keep_locally = true
}

# In a real cloud scenario, this would be an ECS Service or Kubernetes Deployment
resource "docker_container" "todo_app_container" {
  image = docker_image.todo_app.image_id
  name  = "todo-app-terraform"
  ports {
    internal = 3000
    external = 3000
  }
}
