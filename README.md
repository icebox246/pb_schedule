# pb\_schedule

Simple app for viewing personal schedule in PB, created using [Vue.js](https://vuejs.org/) and [Netlify Functions](https://www.netlify.com/products/functions/).

It relies mostly on computing on front-end side, thus can be easily used offline.

Application is available here: [https://iceboxes-pb-schedule.netlify.app/](https://iceboxes-pb-schedule.netlify.app/).

## Running

```console

npm i
# ntl login
ntl dev

```

## Usage

To configure the schedule open settings pane by pressing `schedule` bar on the top (it can be closed by repeating the same action).

Use visible input field to search for required subjects, provide group type (`W`, `Ćw`, etc.), group number and press `+` button.

After adding all needed groups be sure to select appropriate institution and semester.

You can also copy existing setting using `export setting` and afterwards load them using `import settings`.
