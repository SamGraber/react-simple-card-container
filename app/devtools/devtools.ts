const withDevTools = (
  typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__
);

let devTools: any;

export function connect(setAppState: { ( state: any ): void }, messageInterceptor?: { (message: any): void }): Function {
	if (withDevTools) {
		devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();
		const unsubscribe = devTools.subscribe((message: any) => {
			messageInterceptor && messageInterceptor(message);
			if (message.type === 'DISPATCH' && message.payload.type === 'JUMP_TO_ACTION') {
				setAppState(JSON.parse(message.state));
			}
			if (message.type === 'DISPATCH' && message.payload.type === 'IMPORT_STATE') {
				const state = message.payload.nextLiftedState.computedStates[message.payload.nextLiftedState.currentStateIndex].state;
				setAppState(state);
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

export function persistState(state: any): void {
	if (withDevTools) {
		devTools.send('state', state);
	} else {
		console.log('persistState: No dev tools connected')
	}
}
