async function main(
  url: string,
  options: 'compression-stream' | 'blob' | 'node-buffer' = 'node-buffer',
) {
  const response = await fetch(url)
  if (response.body === null) {
    return
  }
  const gzipped = response.body.pipeThrough(new CompressionStream('gzip'))
  const result = await new Response(gzipped).arrayBuffer()
  const view = new Uint8Array(result)

  switch (options) {
    case 'compression-stream':
      {
        const base64 = btoa(String.fromCharCode(...view))
        console.log(base64)
      }
      break
    case 'node-buffer': {
      process.stdout.write(Buffer.from(view))
    }
  }
}

main('https://jsonplaceholder.typicode.com/todos/1')

// 예제 사용법
// fetch('https://jsonplaceholder.typicode.com/todos/1', {
//   headers: {
//     'Accept-Encoding': 'gzip',
//   },
// })
//   .then(async response => {
//     const body = await readResponseBody(response)
//     console.log(body)
//   })
//   .catch(console.error)
