# Recorded voice files

Drop recordings here and they play automatically — no code changes. Any item
without a file falls back to speech synthesis, per item.

Paths must match what the packs declare:

```
audio/numbers/1.mp3 … 10.mp3     "One!" … "Ten!"
audio/abc/a.mp3 … z.mp3          letter names          (Phase 3)
audio/animals/cow.mp3            "Cow!"                (Phase 3)
audio/animals/cow-sound.mp3      "Moo!" (second tap)   (Phase 3)
audio/fruits/apple.mp3           "Apple!"              (Phase 3)
```

Recording tips: warm and cheerful, a beat of silence trimmed off both ends,
mono, normalized so all items are equally loud. MP3 or anything the browser
can decode (the format is sniffed from the file contents, not the extension).

`numbers/3.mp3` is currently a PLACEHOLDER generated with Windows TTS to
prove the recorded-file path end to end — replace it with a real recording.
