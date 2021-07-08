import { MeterProvider } from "@opentelemetry/metrics"
import { BoundCounter } from "@opentelemetry/api-metrics"
import { RequestHandler } from "express"
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus"

const promExporter = new PrometheusExporter({
  host: "0.0.0.0",
  port: PrometheusExporter.DEFAULT_OPTIONS.port,
  endpoint: PrometheusExporter.DEFAULT_OPTIONS.endpoint
})

const meter = new MeterProvider({
  exporter: promExporter,
  interval: 10000
}).getMeter("heart-beat-meter")

const counter = meter.createCounter("requests", {
  description: "Count all incoming requests"
})

const instruments = new Map<string, BoundCounter>()

export const countAllRequests = (): RequestHandler => (req, _res, next) => {
  if (!instruments.has(req.path)) {
    instruments.set(req.path, counter.bind({ route: req.path }))
  }

  instruments.get(req.path)?.add(1)
  next()
}
