
import type { Attacks } from "../types/pokemon"
import { Card, Tag, Typography, Row, Col } from "antd"

const { Title, Text } = Typography

interface PokemonAttacksProps {
  attacks: Attacks
}

export default function PokemonAttacks({ attacks }: PokemonAttacksProps) {
  if (!attacks || (!attacks.fast.length && !attacks.special.length)) {
    return <Text>No attack data available.</Text>
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {attacks.fast.length > 0 && (
        <div>
          <Title level={4}>Fast Attacks</Title>
          <Row gutter={[16, 16]}>
            {attacks.fast.map((attack) => (
              <Col xs={24} md={12} key={attack.name}>
                <Card title={attack.name} bordered>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Tag color="blue" className={`type-${attack.type.toLowerCase()}`}>
                      {attack.type}
                    </Tag>
                    <Text>
                      <strong>{attack.damage}</strong> damage
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {attacks.special.length > 0 && (
        <div>
          <Title level={4}>Special Attacks</Title>
          <Row gutter={[16, 16]}>
            {attacks.special.map((attack) => (
              <Col xs={24} md={12} key={attack.name}>
                <Card title={attack.name} bordered>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Tag color="volcano" className={`type-${attack.type.toLowerCase()}`}>
                      {attack.type}
                    </Tag>
                    <Text>
                      <strong>{attack.damage}</strong> damage
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  )
}
