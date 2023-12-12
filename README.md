<br />
<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/3301/3301750.png" alt="Logo" width="256" height="256">
  <h1 align="center">File Flow</h1>
</div>

## About the Project

<img src="https://i.imgur.com/Vby6WHl.png" alt="Swagger">

File Flow is a lightweight NestJS backend server that allows you to effortlessly upload, access, and manage files. With its intuitive API and robust features, File Flow streamlines file handling for developers and users alike.

This projects aims to be a template or guidance for projects that require handling file uploads on Nest JS projects. Additionally, for academic purposes, the project implements CQRS for better integration with other projects that follow a Domain-Driven Design architecture. Out of the box, this project include an endpoint for uploading, downloading, deleting or updating icons. However, this endpoint can be used indiscriminately with any kind of file of any size.

It's meant that each group of resources (images, icons, files, etc.) has its own controller, but it can be used (out of the box) with any type of file.

### Is Nest JS good for file handling?
The implementation of this project turned out to be really convenient, fast and smooth. In addition, downloading or uploading files are I/O Bound operations, so JavaScript can handle them without any major problems other than speed at which data can be read or written to the disk.

<!-- GETTING STARTED -->
## Getting Started
### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/aleiva17/upc-buddy
   ```
2. Install NodeJS packages in the cloned file
   ```sh
   npm install
   ```
3. Access `.env` and set the storage directory path:
   ```env
   STORAGE_DIRECTORY_PATH=/here/goes/your/path
   ```

4. Run one of the following commands depending on your use case
    ```bash
    # development
    $ npm run start
    
    # watch mode
    $ npm run start:dev
    
    # production mode
    $ npm run start:prod
    ```

5. To access the Swagger documentation, open the following link:
   ```txt
   http://localhost:3000/api/docs
   ```

### Built With
- Nest JS
- Nest CQRS Module
- Open Api Module
- Configuration Module

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat:Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact
Aleiva - [@aleiva17](https://github.com/aleiva17) - aleiva1700@gmail.com
<br />
