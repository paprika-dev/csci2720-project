const comments = [
    "I love this place", 
    "Amazing performance", 
    "Much better than I expected"
]

export const Comment = () => {
    return(
        <>
        <p>Comments</p>
        {comments.map(comment => {
            return(
                <p>{comment}</p>
            )
        })}
        </>
    )
}