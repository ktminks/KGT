# Kitten Growth Tracker

A web app for calculating and managing the needs of growing kittens.

## Run this app locally

### Development mode

From the root directory:
First install all dependencies.
Open a terminal and run  `npm run install`.
Then, to start the back-end, run `npm run server`.
Leave that running in its own terminal and open another.
To start the front-end, run `npm run client`.
Leave this one running as well. Any changes you make will hot reload.

### Deployment mode

From the root directory:
First install all dependencies.
Open a terminal and run  `npm run install`.
Then run `npm run production`.
No need to leave any terminals open.
The server will be running in the background as a pm2 service. View its current status using `npm run server-status`. Restart the server at any time using `npm run restart-server`.
The front-end will be bundled into `front-end/dist` and served via http-server, which will print links to its location to the terminal. 

## Diagrams

### Components & Dependencies


```mermaid
stateDiagram-v2
[*] --> Dashboard
Dashboard --> KittenDisplay


KittenDisplay --> AddKitten
AddKitten --> EstimateAge
EstimateAge --> AddKitten
AddKitten --> KittenDisplay

KittenDisplay --> CurrentKitten: Search
KittenDisplay --> CurrentKitten: Select

CurrentKitten --> EditKitten
EditKitten --> CurrentKitten
CurrentKitten --> KittenDisplay: Delete

Dashboard --> GrowthDisplay
GrowthDisplay --> CurrentKittenDevelopment: Select
GrowthDisplay --> CurrentKittenDevelopment: Search

```

```mermaid
stateDiagram-v2
	[*] --> Dashboard
	Dashboard --> KittenDisplay
	Dashboard --> GrowthDisplay

	state KittenDisplay {	
		[*] --> AddKitten	
		[*] --> CurrentKitten:Search
		[*] --> CurrentKitten:Choose

		CurrentKitten --> DeleteKitten
		CurrentKitten  --> EditKitten
		AddKitten --> AddKitten: EstimateAge
		AddKitten --> CurrentKitten
		
		EditKitten --> CurrentKitten
		DeleteKitten --> CurrentKitten
	}

	state GrowthDisplay {
		[*] --> CurrentKittenDevelopment:Search
		[*] --> CurrentKittenDevelopment:Choose
	}

```

### Code Structure
#### Development 
```mermaid
graph TD
K[/KGT\] --> A[Node]
A -- nodemon --> B[/Back-end/]
B -- HTTP --> E{Express}
M[(Mongo)] -- Mongoose --> E
A -- Webpack --> F[/Front-end/]

E --> P{{API}}
F -- Axios --- P
F --> R>React]
R --> U[\Browser/]

```
#### Production
```mermaid
graph TD
H[/AWS\] --> A[Node]
A -- pm2 --> B[/Back-end/]
M[(Mongo)] -- Mongoose --> E
B -- HTTP --> E{Express}
B -- HTTPS --> D([letsencrypt])
D --> E

P -- Axios --- F
A -- Webpack --> F[/Front-end/]
F --> R>bundle]
E --> P{{API}}

P --> N([nginx])
R --> N
N --> U[\Browser/]
```
## Applicable Standards
eslint and babel used to enforce:
- airbnb standard for javascript
- React recommended standards and rules for hooks
- jsx-a11y
- ES2021