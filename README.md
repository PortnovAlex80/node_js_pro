```plantuml

actor User
participant "GitHub" as GH
participant "Repository" as Repo
participant "README.md" as Readme

User -> GH: Push changes
activate GH
GH -> Repo: Update repository
activate Repo
Repo -> GH: Notify about changes
deactivate Repo
GH -> Readme: Render README.md
activate Readme
Readme -> GH: Display rendered README
deactivate Readme
GH -> User: Notify about successful render
deactivate GH


```
