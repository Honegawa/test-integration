pipeline {
    agent any
    
    parameters {
        stashedFile '.env'
    }

    tools {
        nodejs 'NodeJS-22.4.0'
    }

    stages {
        stage('Import .env') {
           steps {
                dir('./App-Test-Back') {
                    unstash '.env'
                }
            }
        }   
        
        stage('Install Dependencies') {
            
            steps {
                dir('./App-Test-Back') {
                    bat 'npm install'    
                }
            }
        }
        
        stage('Run Tests') {
            
            steps {
                dir('./App-Test-Back') {
                    bat 'npm test'    
                }
            }
        }
    }
    
    post {
        success {
            script {
                bat  """
                    echo "Merging ${source} to ${target}"
                    git fetch
                    git checkout ${target}
                    git pull origin ${target}
                    git merge origin/${source}
                    git push origin ${target} 
                """
            }
            always {
                cleanWs()
            }
        }
    }
}
