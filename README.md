# My Personal Blog

This is the repository for my personal blog, built with [Hugo](https://gohugo.io/) and deployed on [GitHub Pages](https://pages.github.com/).

## About

This blog is where I will:

- Share my experiences and challenges in computer science
- Document the projects I'm working on
- Discuss technologies I'm learning
- Provide solutions to problems I've encountered
- Review and share thoughts on anime series and video games
- Keep up with the latest news in tech, anime, and gaming 

It's designed to be a platform for me to document my journey, learnings, and projects. It also serves as a way for me to connect with the community and share knowledge.

## Technologies Used

- [Hugo](https://gohugo.io/): A fast and modern static site generator
- [GitHub Pages](https://pages.github.com/): Hosting platform
- [Hugo Coder](https://github.com/luizdepra/hugo-coder): The theme used for this blog

## Local Development

To run this blog locally:

1. Install Hugo (see [Hugo installation guide](https://gohugo.io/getting-started/installing/))
2. Clone this repository:
    ```bash
    git clone https://github.com/nabobery/nabobery.github.io.git
    ```
3. Navigate to the project directory:
    ```bash
    cd nabobery.github.io
    ```
4. Start the Hugo server:
    ```bash
    hugo server
    ```
    - To rebuild the site on file changes, run `hugo server -D`
    - To disable Fast Render, run `hugo server --disableFastRender`
    - To run the server on a specific port, run `hugo server --port=1313`
    - To run the server and open it in the browser, run `hugo server --browser`
    - To run the server and open it in the browser on a specific port, run `hugo server --port=1313 --browser`
    - To run the server and open it in the browser on a specific port with Fast Render disabled, run `hugo server --port=1313 --browser --disableFastRender`
    - To run the server and open it in the browser on a specific port with Fast Render disabled and drafts included, run `hugo server --port=1313 --browser --disableFastRender -D`
    - To run the server and open it in the browser on a specific port with Fast Render disabled, drafts included, and future content included, run `hugo server --port=1313 --browser --disableFastRender -D --buildFuture`
    - To run the server and open it in the browser on a specific port with Fast Render disabled, drafts included, future content included, and expired content included, run `hugo server --port=1313 --browser --disableFastRender -D --buildFuture --buildExpired`
    - To run the server and open it in the browser on a specific port with Fast Render disabled, drafts included, future content included, expired content included, and content not in the default language included, run `hugo server --port=1313 --browser --disableFastRender -D --buildFuture --buildExpired
5. Open your browser and visit `http://localhost:1313`

## Deployment

This blog is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

## Contributing

While this is a personal blog, I welcome any suggestions or corrections. Feel free to open an issue or submit a pull request.
