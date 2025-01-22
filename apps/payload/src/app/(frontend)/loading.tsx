/**
 * The function `Loading` returns a simple loading message centered on the screen using flexbox styling in a React component.
 * @returns A functional component named Loading is being returned. It contains a div element with the class "flex flex-col w-4/6 justify-center mx-auto" and a paragraph element with the text "Loading...".
 */
export default function Loading() {
    return (
        <div className="flex flex-col w-4/6 justify-center mx-auto">
            <p className="text-center">Loading...</p>
        </div>
    )
}