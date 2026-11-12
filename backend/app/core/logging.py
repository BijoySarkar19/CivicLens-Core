import logging
import sys


class SensitiveDataFilter(logging.Filter):
    SENSITIVE = ("password", "token", "secret", "authorization", "cookie")

    def filter(self, record: logging.LogRecord) -> bool:
        message = record.getMessage().lower()
        if any(word in message for word in self.SENSITIVE):
            record.msg = "[REDACTED SENSITIVE LOG MESSAGE]"
            record.args = ()
        return True


def configure_logging() -> None:
    handler = logging.StreamHandler(sys.stdout)
    handler.addFilter(SensitiveDataFilter())
    handler.setFormatter(logging.Formatter(
        "%(asctime)s | %(levelname)s | %(name)s | %(message)s",
        datefmt="%Y-%m-%dT%H:%M:%S",
    ))
    root = logging.getLogger()
    root.handlers.clear()
    root.addHandler(handler)
    root.setLevel(logging.INFO)
