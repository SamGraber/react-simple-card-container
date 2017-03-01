const withDevTools = (
  typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__
);

let devTools: any;

export function connect(getState: { ( state: any ): void }): Function {
	if (withDevTools) {
		devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();
		const unsubscribe = devTools.subscribe((message: any) => {
			if (message.type === 'DISPATCH' && message.payload.type === 'JUMP_TO_ACTION') {
				getState(JSON.parse(message.state));
			}
			if (message.type === 'DISPATCH' && message.payload.type === 'IMPORT_STATE') {
				const state = message.payload.nextLiftedState.computedStates[message.payload.nextLiftedState.currentStateIndex].state;
				getState(state);
			}
		});

		return () => {
			unsubscribe();
			devTools = null;
		};
	} else {
		console.log('connect: No dev tools available');
		return () => null;
	}
}

export function setState(state: any): void {
	if (withDevTools) {
		devTools.send('state', state);
	} else {
		console.log('setState: No dev tools connected')
	}
}
