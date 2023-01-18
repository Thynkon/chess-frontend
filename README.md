# ExChess - Frontend
<a name="readme-top"></a>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
        <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#configuration">Configuration</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#documentation">Documentation</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

### Built With

* [TypeScript][typescript-url]
* [React][react-url]
* [React Framer Motion][framer-motion-url]
* [AnimeJS][animejs-url]
* [Formik][formik-url]
* [Tailwind CSS][tailwind-url]
* [Flow bite][flow-bite-url]
* [React Chessground][react-chessground-url]
* [React Router][react-router-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This project was inspired by both [Lichess](https://lichess.org) and [Chess.com](https://www.chess.com/home).

It uses `Lichess` chessground library to display the chessboard and move pieces.

The business logic is handled by the [backend](https://github.com/Thynkon/chess-backend).

### Prerequisites

* [Yarn](https://yarnpkg.com/getting-started)

### Configuration

As this application connects to a `Elixir` backend, you need to specify the `API Endpoint`.

To do so, rename the file `src/config.ts.example` to `src/config.ts` and change the URL.

### Installation

1. Install dependencies

   ```sh
   yarn install
   ```

2. Launch the web server

    ```sh
    yarn run start
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Documentation
A detailed description of this project can be found under `docs/report.md`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact
- [Thynkon](https://github.com/Thynkon)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[typescript-url]: https://www.typescriptlang.org
[react-url]: https://reactjs.org/
[framer-motion-url]: https://www.framer.com/motion
[animejs-url]: https://animejs.com
[formik-url]: https://formik.org
[react-router-url]: https://reactrouter.com
[tailwind-url]: https://tailwindcss.com
[flow-bite-url]: https://flowbite-react.com
[react-chessground-url]: https://github.com/react-chess/chessground