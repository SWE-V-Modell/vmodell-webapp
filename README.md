# VmodellWebapp

## Contribution

### Linting

We are using TypeScript Linter. :)
Use it too.

### Branching Policy
We are using a shrunk form of the common [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/#the-main-branches).

The central repo holds two main branches with an infinite lifetime: `master` and `dev`.

* The **master** branch is the branch where the source code always reflects a production-ready state.
* The **develop**(dev) branch is the branch where the source code always reflects a state with the latest delivered development changes for the next release.

Feature branches are used to develop new features for the upcoming release. They are derived from the issue board.
Every feature branch is always created from the **dev** branch and will solely be remerged into **dev**.

Its lifetime should be as short as possible.

Commits into the master are **strictly forbidden** - always use a pull request.
### Further information
* Create code,commits and assets in English (only).
* Note the number of your issue in your commit-messages to take full advtantage of the issueboard.
* Assign yourself to an issue in the issue board.
* If you are stuck at an issue, consider adding the Label *Help Wanted*.
* Consider pushing your feature branches remote, so others can help or pick up your work. Tidy up when the issue is closed.

### Styleguide

This app uses [Angular Material](https://material.angular.io/components/categories) and [Material Bootstrap Design for Angular (MDB)](https://mdbootstrap.com/docs/angular/components/demo/).
Mainly **MDB** components should be used.