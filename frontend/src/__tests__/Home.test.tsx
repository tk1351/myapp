import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../components/Home'

describe('Rendering', () => {
  it('should texts rendered', () => {
    render(<Home />)

    expect(screen.getByText('あなたのビジネスに役立つICT製品がきっと見つかる!')).toBeInTheDocument()
    expect(screen.getByText('ログイン・新規登録はこちらから')).toBeInTheDocument()
    expect(screen.getByText('幅広い製品情報を網羅!')).toBeInTheDocument()
  })

  it('should work link role', () => {
    render(<Home />)

    expect(screen.getByRole('link')).toBeInTheDocument()
    
    expect(screen.getByRole('link').closest('a')).toHaveAttribute('href', '/login')
  })
})
