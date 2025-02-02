
# Genetics and Evolution Quiz

## Project Overview

The **Genetics and Evolution Quiz** is an interactive quiz application designed to test users' knowledge on the topic of **Genetics and Evolution**. The quiz features multiple-choice questions with a timer, a "questions attempted" counter, and a scoring system. Users can start the quiz, answer questions, see their results, and optionally retry the quiz after completion.

### Features:
- Start Page: Displays a title and a button to start the quiz.
- Timer: A 10-minute countdown timer that runs during the quiz.
- Question & Options: Multiple-choice questions with radio buttons to select answers.
- Clear Answer: Users can clear their answer for each question.
- Results Page: Displays the score, the number of questions attempted, and the option to retry the quiz.


Screenshots of the UI are provided below-

![Home Page](https://github.com/user-attachments/assets/7205a956-0ec5-4231-80da-23d9335f739b)
![Quiz Page](https://github.com/user-attachments/assets/7fd917e4-d7a4-4eec-8800-73847387e47e)
![Result Page](https://github.com/user-attachments/assets/b3adc746-1c20-4567-b5c8-859c2864649b)


A video walkthrough of the app is provided below- 
https://github.com/user-attachments/assets/3e6c4ccc-c4cf-42fe-95ee-d847db57f3fd

## Setup Instructions

Follow these steps to get the project up and running:

### Prerequisites:
- **Node.js**: Make sure Node.js is installed on your machine. You can download it from [here](https://nodejs.org/).
- **Vue CLI** (optional, if not already installed): Install Vue CLI globally by running:
  ```bash
  npm install -g @vue/cli
  ```

### Steps to Set Up:
1. **Clone the repository:**
   - Run the following command in your terminal to clone the repository:
     ```bash
     git clone https://github.com/yourusername/genetics-evolution-quiz.git
     ```

2. **Install dependencies:**
   - Navigate to the project directory:
     ```bash
     cd genetics-evolution-quiz
     ```
   - Install the required dependencies using npm:
     ```bash
     npm install
     ```

3. **Run the application:**
   - Start the development server:
     ```bash
     npm run serve
     ```
   - Open your browser and go to `http://localhost:8080/` to view the app.

## Project Structure

```
/genetics-evolution-quiz
  /node_modules        # Node.js modules
  /public              # Static files (index.html)
  /src                 # Application source code
    /assets            # Images, icons, styles
    /components        # Vue.js components
    /App.vue           # Main application component
    /main.js           # Entry point for Vue.js
  /package.json        # Project dependencies and scripts
  /README.md           # Project documentation
```

## APIs and Data

The quiz data (questions and answers) is fetched from an external API:

- **API endpoint**: [https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX](https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX)

## Technologies Used
- **Vue.js**: The frontend JavaScript framework used to build the interactive user interface.
- **Axios**: Used for making HTTP requests to fetch quiz data.
- **HTML/CSS**: Basic HTML and CSS for layout and styling.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

If you encounter any issues or have further questions, feel free to open an issue or contact me!





