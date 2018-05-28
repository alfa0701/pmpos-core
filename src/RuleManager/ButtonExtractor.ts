import { CardRecord, CardTagRecord } from "../models";
import ConfigManager from "../ConfigManager";
import CardManager from "../CardManager";

export default function extract(card: CardRecord): {} | undefined {
    const result = {};
    for (const subcard of card.allCards) {
        const values = extractFrom(subcard);
        if (values.value.length > 0) {
            result[values.key] = values.value;
        }
    }
    return Object.keys(result).length > 0 ? result : undefined;
}

function extractFrom(card: CardRecord): { key: string, value: string[] } {
    const refTag = getReferenceTag(card);
    if (refTag) {
        return { key: refTag.value, value: extractFromTag(refTag) };
    }
    const result = { key: card.name, value: [] as string[] };
    for (const tag of card.allTags.filter(t => t.name !== 'Name')) {
        result.value.push(...extractFromTag(tag));
    }
    return result;
}

function getReferenceTag(card: CardRecord) {
    return card.allTags.find(x => Boolean(x.typeId));
}

function extractFromTag(tag: CardTagRecord): string[] {
    const tt = ConfigManager.getTagTypeById(tag.typeId);
    if (tt && tt.cardTypeReferenceName) {
        const referenceCard = CardManager.getCardById(tag.cardId);
        if (referenceCard) { return extractSubCardNames(referenceCard); }
    }
    return [tag.value];
}

function extractSubCardNames(card: CardRecord): string[] {
    return card.allCards
        .map(t => t.name);
}