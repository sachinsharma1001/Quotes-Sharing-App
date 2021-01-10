import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { createQuotes, deleteQuotes, getQuotes, patchQuotes } from '../api/quotes-api'
import Auth from '../auth/Auth'
import { Quotes } from '../types/Quotes'

interface QuotesProps {
  auth: Auth
  history: History
}

interface QuotesState {
  quotes: Quotes[]
  newQuoteName: string
  newQuoteDescription: string
  loadingQuotes: boolean
}

export class Quote extends React.PureComponent<QuotesProps, QuotesState> {
  state: QuotesState = {
    quotes: [],
    newQuoteName: '',
    newQuoteDescription: '',
    loadingQuotes: true
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newQuoteName: event.target.value })
  }

  onEditButtonClick = (todoId: string) => {
    this.props.history.push(`/quotes/${todoId}/edit`)
  }

  onQuoteCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      const newQuote = await createQuotes(this.props.auth.getIdToken(), {
        name: this.state.newQuoteName,
        description: this.state.newQuoteDescription
      })
      this.setState({
        quotes: [...this.state.quotes, newQuote],
        newQuoteName: '',
        newQuoteDescription: ''
      })
    } catch {
      alert('Quote creation failed')
    }
  }

  onQuoteDelete = async (quoteId: string) => {
    try {
      await deleteQuotes(this.props.auth.getIdToken(), quoteId)
      this.setState({
        quotes: this.state.quotes.filter(quote => quote.quoteId != quoteId)
      })
    } catch {
      alert('Quote deletion failed')
    }
  }

  // onQuotesCheck = async (pos: number) => {
  //   try {
  //     const quote = this.state.quotes[pos]
  //     await patchQuotes(this.props.auth.getIdToken(), quote.quoteId, {
  //       name: quote.name,
  //       description: quote.description
  //     })
  //     this.setState({
  //       quotes: update(this.state.quotes, {
  //         [pos]: { done: { $set: !todo.done } }
  //       })
  //     })
  //   } catch {
  //     alert('Todo deletion failed')
  //   }
  // }

  async componentDidMount() {
    try {
      const quotes = await getQuotes(this.props.auth.getIdToken())
      this.setState({
        quotes,
        loadingQuotes: false
      })
    } catch (e) {
      alert(`Failed to fetch quotes: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Quotes</Header>

        {this.renderCreateQuotesInput()}

        {this.renderQuotes()}
      </div>
    )
  }

  renderCreateQuotesInput() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'New task',
              onClick: this.onQuoteCreate
            }}
            fluid
            actionPosition="left"
            placeholder="To change the world..."
            onChange={this.handleNameChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
  }

  renderQuotes() {
    if (this.state.loadingQuotes) {
      return this.renderLoading()
    }

    return this.renderQuotesList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Quotes
        </Loader>
      </Grid.Row>
    )
  }

  renderQuotesList() {
    return (
      <Grid padded>
        {this.state.quotes.map((quote, pos) => {
          return (
            <Grid.Row key={quote.quoteId}>
              {/* <Grid.Column width={1} verticalAlign="middle">
                <Checkbox
                  onChange={() => this.onQuotesCheck(pos)}
                  checked={todo.done}
                />
              </Grid.Column> */}
              <Grid.Column width={10} verticalAlign="middle">
                {quote.name}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {quote.description}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(quote.quoteId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="red"
                  onClick={() => this.onQuoteDelete(quote.quoteId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {quote.attachmentUrl && (
                <Image src={quote.attachmentUrl} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }

  
}
