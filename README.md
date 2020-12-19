# JobBlog
![](https://img.shields.io/badge/Language-JavaScript-green.svg)
![](https://img.shields.io/badge/Contributor-5-yellow.svg)

### Table of Contents

- [Description](#description)
- [Team Info](#team-info)
- [Repository Structure](#repository-structure)
- [How To Use](#how-to-use)
- [General Status](#general-status)
- [Code Layout](#code-layout)

## Description
Job Blog: An online platform for NEU students to share open job opportunities and information.

#### Technologies

- [React](https://reactjs.org/) - Javascript Library for creating UI
- [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps
- [BootStrap](https://getbootstrap.com/) - A potent front-end framework used to create modern websites and web apps
- [Firebase](https://firebase.google.com/) - A complete backend solution that can manage authentication, real time database and hosting 

#### Website URL
- [JOB BLOG DEPLOYED WEBSITE](https://jobblog-b9681.web.app)
- [JOB BLOG LANDING PAGE](https://pages.github.ccs.neu.edu/2020FACS5500SV/project-jobblog/)

#### Live Demo
[LIVE DEMO](https://www.youtube.com/watch?v=qvXGjlZ16M8)

## Team Info

Project team (Team size: 5):
- Yuting Sun      - yutingsun
- Xiaowen He      - kellyhe
- Lei Cao         - clstar8
- Zhengquan Chen  - crdbuddy
- Haoran Yu       - haoranyu

Primary Representative: [Lei Cao](https://github.ccs.neu.edu/clstar8)
Alternative Representative: [Yuting Sun](https://github.ccs.neu.edu/yutingsun)

## Repository Structure
- [Code](https://github.ccs.neu.edu/2020FACS5500SV/project-jobblog)
- [Readme](https://github.ccs.neu.edu/2020FACS5500SV/project-jobblog)
- [Wiki](https://github.ccs.neu.edu/2020FACS5500SV/project-jobblog/wiki)
  - [Home](https://github.ccs.neu.edu/2020FACS5500SV/project-jobblog/wiki)
  - [Reference](https://github.ccs.neu.edu/2020FACS5500SV/project-jobblog/wiki/Reference)
  - [Use Case](https://github.ccs.neu.edu/2020FACS5500SV/project-jobblog/wiki/Use-Case)
- [Project Board](https://github.ccs.neu.edu/2020FACS5500SV/project-jobblog/projects)
  - [Main](https://github.ccs.neu.edu/2020FACS5500SV/project-jobblog/projects/5)
  - [Sprint one](https://github.ccs.neu.edu/2020FACS5500SV/project-jobblog/projects/1)
  - [Sprint two](https://github.ccs.neu.edu/2020FACS5500SV/project-jobblog/projects/3)
  - [Sprint three](https://github.ccs.neu.edu/2020FACS5500SV/project-jobblog/projects/4)
- [Project Docs](https://github.ccs.neu.edu/2020FACS5500SV/project-jobblog/tree/master/docs)
  - [Introduction](./docs/5500IntroductionDocumentation.pdf)
  - [Communication Plan](./docs/5500CommunicationPlan.pdf)
  - [Project API](./docs/5500ProjectAPI.pdf)
  - [Project Design](./docs/5500ProjectDesign.pdf)
  - [Project Feature](./docs/5500ProjectFeature.pdf)
  - [Project Methodology](./docs/5500ProjectMethodology.pdf)
  - [Project Test Plan](./docs/5500TestPlan.pdf)
  - [Project Presentation Slides](./docs/5500Presentation.pdf)

## How To Use

#### Installation

1. Clone the repository to your local computer.
2. Go to the project directory.
3. Run `npm install` to install all the dependencies.
4. Run `npm start` to build and start the project.

- Firebase
run `npm install firebase`

#### Deploy
1. Install firebase CLI, run `npm install -g firebase-tools`
2. run `npm run build`
3. run `firebase init hosting`
    - What do you want to use as your public directory? build
    - Configure as a single-page app (rewrite all urls to /index.html)? Yes
    - Set up automatic builds and deploys with GitHub? No
    - File build/index.html already exists. Overwrite? No
4. run `firebase deploy --only hosting`

#### Test
1. run `npm test`

## General Status

| Feature Name                        | Status                                    | Technology  | Priority |  Deadline    |
| :---------------------------------: |:-----------------------------------------:| :---------: | :------: |  :--------:  |
| Public Pages                        | DONE  | Github Pages| __HIGH__ | Nov 10, 2020 |
| Github Wiki                         | DONE  | Github Wiki| __HIGH__ | Nov 10, 2020 |
| Github Project Board                | DONE  | Github Project| __HIGH__ | Nov 10, 2020 |
| Communication Plan                  | DONE  | N/A | __HIGH__ | Dec 04, 2020 |
| Code Implementation                  | DONE  | React | __HIGH__ | Dec 14, 2020 |
| Project Deployment| DONE  | Firebase Hosting| __HIGH__ | Dec 14, 2020 |

## Code Layout
```sh
├── README.md
├── docs
│   ├── 5500CommunicationPlan.pdf
│   ├── 5500IntroductionDocumentation.pdf
│   ├── 5500ProjectAPI.pdf
│   ├── 5500ProjectDesign.pdf
│   ├── 5500ProjectFeature.pdf
│   ├── 5500ProjectMethodology.pdf
│   └── 5500TestPlan.pdf
├── firebase.json
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.js
│   ├── Component
│   ├── Config
│   ├── Layout
│   ├── __tests__
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
└── yarn.lock
```

