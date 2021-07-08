import { ZipkinExporter } from "@opentelemetry/exporter-zipkin"
import { SimpleSpanProcessor } from "@opentelemetry/tracing"
import { NodeTracerProvider } from "@opentelemetry/node"
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api"
import { Resource } from "@opentelemetry/resources"
import { ResourceAttributes } from "@opentelemetry/semantic-conventions"
import { registerInstrumentations } from "@opentelemetry/instrumentation"
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http"

console.log("Starting OpenTelemetry instrumentation")

const provider = new NodeTracerProvider({
  resource: new Resource({
    [ResourceAttributes.SERVICE_NAME]: "TodoService"
  })
})

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL)

provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new ZipkinExporter({
      url: "http://zipkin:9411/api/v2/spans"
    })
  )
)
provider.register()

registerInstrumentations({
  instrumentations: [new HttpInstrumentation()]
})
