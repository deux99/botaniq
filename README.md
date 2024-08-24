# Botaniq - AI-Powered Plant Disease Diagnosis

**Botaniq** is a user-friendly web application designed to help home gardeners diagnose plant diseases with accuracy by utilizing artificial intelligence. By simply uploading photos of their plants, users can receive valuable insights into plant health, access treatments, and prevent further issues.

## Features

- **AI-Powered Diagnosis:** Upload a photo of your plant, and the AI model will analyze it to detect potential diseases.
- **Comprehensive Database:** Explore a wide range of information on plant diseases, symptoms, treatments, and prevention tips.
- **Thriving Community Forum:** Connect with other gardeners to share experiences, tips, and advice.
- **Intuitive Interface:** Enjoy a seamless experience with our easy-to-use and visually appealing design.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
  
## Getting Started

Follow these steps to set up **Botaniq** on your local machine for development and testing purposes.

### Prerequisites

- Python 3.x
- Flask
- TensorFlow (for AI model)
- Other dependencies listed in `requirements.txt`

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/deux99/botaniq.git
   ```

2. Navigate to the project directory:

   ```bash
   cd botaniq
   ```

3. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database (if applicable):

   ```bash
   python manage.py db init
   python manage.py db migrate
   python manage.py db upgrade
   ```

5. Start the Flask development server:

   ```bash
   flask run
   ```

6. Open your browser and navigate to:

   ```
   http://localhost:5000
   ```

### Usage

- **Upload Photo:** Users can upload photos of their plants for AI analysis.
- **View Results:** The app will display possible diseases, symptoms, and treatments.
- **Community Forum:** Join the discussions with other gardeners to learn and share.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Submit a pull request with a clear explanation of your changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize and extend this based on any specific instructions or setup for your project!
