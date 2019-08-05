import React from 'react'
import { Button } from 'semantic-ui-react'

const PageButtons = (props) => {

    const pageCount = (Math.floor(props.totalPages / 10)) + 1

    const prevDisabled = (props.pageNum == 1)

    const nextDisabled = (props.pageNum == pageCount)

    return (
        <div>
            <Button.Group widths='3'>
                <Button content='Prev' icon='left arrow' labelPosition='left' onClick={props.prevPage} disabled={prevDisabled} />
                <Button content={`Page ${props.pageNum} of ${pageCount}`} />
                <Button content='Next' icon='right arrow' labelPosition='right' onClick={props.nextPage} disabled={nextDisabled} />
            </Button.Group>

        </div>
    )
}

export default PageButtons