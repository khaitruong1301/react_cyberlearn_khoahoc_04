import React from 'react'
import { history } from '../../util/history'

export default function Contact() {
    return (
        <div>
            liên hệ
          <button onClick={()=>{history.push('/demohocmodal')}}>123</button>

        </div>
    )
}
