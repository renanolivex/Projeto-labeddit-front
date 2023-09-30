export function GlobalState(props){
    const data={
        
    }


    return (
        <GlobalContext.Provider value={data}>
            {props.children}
        </GlobalContext.Provider>
    )

}